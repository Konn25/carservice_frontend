import { Component} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Picture } from 'src/app/interfaces/picture_interface';
import { AuthService } from 'src/app/services/auth_service';
import { PictureService } from 'src/app/services/picture_service';


class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-car-picture',
  templateUrl: './car-picture.component.html',
  styleUrls: ['./car-picture.component.css']
})
export class CarPictureComponent {

  id!: number;

  selectedFile: ImageSnippet;

  safeImage: SafeUrl;

  pictureList: Picture[] = [];

  constructor(private router: Router ,private activatedRoute: ActivatedRoute, private imageService: PictureService, 
              private authService: AuthService, private sanitizer: DomSanitizer){}

  ngOnInit(){

    this.activatedRoute.params.subscribe(params => {this.id = params['id']});
    this.getAllPicture(); 
    
  }


  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    this.getAllPicture();
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.imageService.createNewPicture(this.id,this.selectedFile.file, this.authService.getToken()).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError()
        
    })});

    reader.readAsDataURL(file);
  }

  goBack(): void {
    this.router.navigate(['../cars/car/data/'+this.id], { relativeTo: this.activatedRoute.parent});
  }

  getAllPicture() {
    return this.imageService.getCarAllPicture(this.id,this.authService.getToken()).subscribe(((item: Picture[]) =>
    {
      this.pictureList = (item), 
      this.getPictureBack();
    }
    ));
  }

   getPictureBack(){
    this.pictureList.forEach(element => {
      this.imageService.getPictureById(element.id, this.authService.getToken()).subscribe((data: any) =>{
        var imageUrl = URL.createObjectURL(data);
        element.image_data=imageUrl;
    })
    });

  }

  deletePicture(pictureId: number){
    this.imageService.deletePictureById(pictureId, this.authService.getToken()).subscribe({
      next: () => this.getAllPicture(),
      error: () => this.getAllPicture()
    });
  }


}
