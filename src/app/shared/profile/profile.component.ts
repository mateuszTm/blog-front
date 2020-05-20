import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/dto/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() profile: Profile;
  @Output() editAction: EventEmitter<void> = new EventEmitter();
  @Output() deleteAction: EventEmitter<void> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  runDelete() {
    console.log('kliknięto usunięcie profile');
  }
}
