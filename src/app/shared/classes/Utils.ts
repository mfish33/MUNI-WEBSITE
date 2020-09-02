import { FormGroup } from '@angular/forms'

export default class Utils{
    public static getEmailErrors(form:FormGroup): string {
        let errors = form.get('email').errors
        if(errors) {
          if(errors.email) {
            return 'Please enter a valid email'
          }
          return 'Required *'
        }
      }
}