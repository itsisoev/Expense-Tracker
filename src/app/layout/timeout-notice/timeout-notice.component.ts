import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';

@Component({
  selector: 'layout-timeout-notice',
  standalone: true,
  imports: [],
  templateUrl: './timeout-notice.component.html',
  styleUrl: './timeout-notice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeoutNoticeComponent {
  private readonly closedKey = 'timeoutNoticeClosed';
  private dismissed = signal(sessionStorage.getItem(this.closedKey) === 'true');

  showNotice = computed(() => !this.dismissed());

  close() {
    this.dismissed.set(true);
    sessionStorage.setItem(this.closedKey, 'true');
  }
}
