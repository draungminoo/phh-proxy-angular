import { DestroyRef, inject } from '@angular/core';
import { Subject } from 'rxjs';

export function onComponentDestroy() {
  const subject = new Subject<void>();
  inject(DestroyRef).onDestroy(() => {
    subject.next();
    subject.complete();
    // subject.unsubscribe();
  });
  return subject.asObservable();
}
