import { Component, OnInit } from '@angular/core';
import { GameMap } from '../../models/map.interface';
import { MapService } from '../../services/map.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-map-selector',
  standalone: true,
  imports: [MatCardModule, NgForOf],
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss']
})
export class MapSelectorComponent implements OnInit {
  maps: GameMap[] = [];

  constructor(private mapService: MapService, private router: Router) {}

  ngOnInit(): void {
    this.mapService.getMaps().subscribe(data => this.maps = data);
  }

  selectMap(selectedMap: GameMap): void {
    this.router.navigate(['/game', selectedMap.id]);
  }
}
