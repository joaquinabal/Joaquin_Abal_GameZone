    import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function minCheckboxSeleccionados(min: number): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const selected = Object.values((group as FormGroup).controls)
      .filter(control => control.value === true).length;

    return selected >= min ? null : { minSeleccionados: { required: min, actual: selected } };
  };
}
