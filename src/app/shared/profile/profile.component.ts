import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/dto/profile';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { MessageService } from 'src/app/services/message/message.service';

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
    private profileService: ProfileService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  runDelete() {
    if (confirm('Na pewno chcesz usunąć ten profil?')) {
      this.profileService.deleteProfile(this.profile.id).subscribe({
        next: (resp) => {
          this.messageService.success('Profil został usunięty');
          this.whenDelete.emit();
        }
      });
    }
  }
}
