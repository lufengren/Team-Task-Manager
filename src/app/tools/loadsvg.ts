import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const loadsvg = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = 'assets/img';
  const sideBarDir = `${imgDir}/sidebar`;
  const avatarDir = `${imgDir}/avatar`;
  ir.addSvgIconSetInNamespace('avatars', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));
  ir.addSvgIcon('day', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/day.svg`));
  ir.addSvgIcon('month', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/month.svg`));
  ir.addSvgIcon('projects', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/projects.svg`));
  ir.addSvgIcon('home', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/home.svg`));
  ir.addSvgIcon('week', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/week.svg`));
};
