import { Credentials } from './model';
import { ValidationService } from './validation.service';


let credentials = {} as Credentials

describe('ValidationService', () => {
    let validationService: ValidationService,
        mockHttp;


beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['post'])
    validationService = new ValidationService(mockHttp)
})


describe('validate', () => {
    it('should return a variety error if the pasword does not contain at least one number', () => {
        credentials.password = 'allAlphabet'
        expect(validationService.validate(credentials)).toContain('variety')
    })

    it('should return a variety error if the pasword does not contain at least one letter', () => {
        credentials.password = '12345567'
        expect(validationService.validate(credentials)).toContain('variety')
    })

    it('should return a duplicates error if the pasword contains repeats', () => {
        credentials.password = 'aaaabb'
        expect(validationService.validate(credentials)).toContain('duplicates')
    })

    it('should return a length error if the pasword is too short', () => {
        credentials.password = 'four'
        expect(validationService.validate(credentials)).toContain('length')
    })

    it('should return a length error if the pasword is too long', () => {
        credentials.password = 'fourfourfour1234567890'
        expect(validationService.validate(credentials)).toContain('length')
    })
})

})

