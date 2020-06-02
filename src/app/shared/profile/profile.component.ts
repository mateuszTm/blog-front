import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/dto/profile';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() profile: Profile;
  @Output() whenEdit: EventEmitter<void> = new EventEmitter();
  @Output() whenDelete: EventEmitter<void> = new EventEmitter();

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  runDelete() {
    if (confirm('Na pewno chcesz usunąć ten profil?')) {
      this.profileService.delete(this.profile.id).subscribe({
        next: (resp) => {
          this.messageService.success('Profil został usunięty');
          this.whenDelete.emit();
        },
        error: (err) => {
          this.messageService.error(err);
        }
      });
    }
  }
}
