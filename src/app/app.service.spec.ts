import { Credentials } from './model';
import { AppService } from './app.service';


let credentials = {} as Credentials

describe('AppService', () => {
    let appService: AppService,
        mockHttp;


beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['post'])
    appService = new AppService(mockHttp)
})


describe('validate', () => {
    it('should return a variety error if the pasword does not contain at least one number', () => {
        credentials.password = 'allAlphabet'
        expect(appService.validate(credentials)).toContain('variety')
    })

    it('should return a variety error if the pasword does not contain at least one letter', () => {
        credentials.password = '12345567'
        expect(appService.validate(credentials)).toContain('variety')
    })

    it('should return a duplicates error if the pasword contains repeats', () => {
        credentials.password = 'aaaabb'
        expect(appService.validate(credentials)).toContain('duplicates')
    })

    it('should return a length error if the pasword is too short', () => {
        credentials.password = 'four'
        expect(appService.validate(credentials)).toContain('length')
    })

    it('should return a length error if the pasword is too long', () => {
        credentials.password = 'fourfourfour1234567890'
        expect(appService.validate(credentials)).toContain('length')
    })
})

})

