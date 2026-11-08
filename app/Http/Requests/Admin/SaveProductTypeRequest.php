<?php

namespace App\Http\Requests\Admin;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class SaveProductTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->hasRole(User::ROLE_ADMIN);
    }

    protected function prepareForValidation(): void
    {
        $name = preg_replace('/\s+/', ' ', trim((string) $this->input('name')));

        $this->merge([
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->filled('description') ? trim((string) $this->input('description')) : null,
            'is_active' => $this->has('is_active') ? $this->boolean('is_active') : true,
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $current = $this->route('productType');

        return [
            'name' => ['required', 'string', 'min:2', 'max:80'],
            // La unicidad se valida sobre el slug: "Camisetas Oversize" = "camisetas  oversize".
            'slug' => ['required', Rule::unique('product_types', 'slug')->ignore($current)],
            'description' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Escribe el nombre del tipo de producto.',
            'name.min' => 'El nombre debe tener al menos 2 caracteres.',
            'name.max' => 'El nombre no puede superar 80 caracteres.',
            'slug.required' => 'El nombre debe contener letras o números.',
            'slug.unique' => 'Ya existe un tipo de producto con este nombre.',
            'description.max' => 'La descripción no puede superar 255 caracteres.',
        ];
    }

    /** El error de slug se muestra en el campo nombre. */
    public function attributes(): array
    {
        return ['slug' => 'nombre'];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator): void
    {
        $errors = $validator->errors();
        if ($errors->has('slug')) {
            $errors->add('name', $errors->first('slug'));
            $errors->forget('slug');
        }
        parent::failedValidation($validator);
    }
}
