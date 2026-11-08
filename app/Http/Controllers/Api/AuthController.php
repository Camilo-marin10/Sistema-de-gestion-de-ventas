<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

/**
 * Autenticación de la SPA con tokens personales de Sanctum (Authorization: Bearer).
 */
class AuthController extends Controller
{
    /** Intentos fallidos permitidos por correo + IP antes de bloquear temporalmente. */
    private const MAX_ATTEMPTS = 5;

    /** Vigencia del token de sesión. */
    private const TOKEN_TTL_DAYS = 7;

    /**
     * Registro público: siempre crea usuarios con rol "cliente".
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = new User($request->safe()->only(['name', 'email', 'phone', 'password']));
        $user->role = User::ROLE_CLIENTE;
        $user->is_active = true;
        $user->save();

        return $this->sessionResponse($user, 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $key = 'login:'.Str::transliterate($request->input('email')).'|'.$request->ip();

        if (RateLimiter::tooManyAttempts($key, self::MAX_ATTEMPTS)) {
            $seconds = RateLimiter::availableIn($key);
            throw ValidationException::withMessages([
                'email' => 'Demasiados intentos fallidos. Intenta de nuevo en '.ceil($seconds / 60).' minuto(s).',
            ])->status(429);
        }

        $user = User::where('email', $request->input('email'))->first();

        if (! $user || ! Hash::check($request->input('password'), $user->password)) {
            RateLimiter::hit($key, 60 * 5);
            throw ValidationException::withMessages([
                'email' => 'El correo o la contraseña no son correctos.',
            ]);
        }

        if (! $user->is_active) {
            throw ValidationException::withMessages([
                'email' => 'Tu cuenta está desactivada. Contacta al administrador.',
            ])->status(403);
        }

        RateLimiter::clear($key);
        $user->forceFill(['last_login_at' => now()])->save();

        return $this->sessionResponse($user);
    }

    public function me(Request $request): UserResource
    {
        return new UserResource($request->user());
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente.']);
    }

    private function sessionResponse(User $user, int $status = 200): JsonResponse
    {
        $token = $user->createToken('spa', ['*'], now()->addDays(self::TOKEN_TTL_DAYS))->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => new UserResource($user),
        ], $status);
    }
}
