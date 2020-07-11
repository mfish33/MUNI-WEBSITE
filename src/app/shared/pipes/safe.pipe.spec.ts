import { SafePipe } from './safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';


describe('SafePipe', () => {
    it('create an instance', () => {
        const pipe = new SafePipe(TestBed.inject(DomSanitizer));
        expect(pipe).toBeTruthy();
    });
});
