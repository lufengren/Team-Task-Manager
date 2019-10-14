import { Injectable } from '@angular/core';
import * as Azure from '@azure/storage-blob';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../handleError.service';

@Injectable({
    providedIn: 'root'
})

export class AzureStorageService {
    accountName = `teamtaskimgupload`;
    containerName = `testcontainer`;
    // tslint:disable-next-line:max-line-length
    private sasString = `sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-10-10T07:35:12Z&st=2019-10-09T23:35:12Z&spr=https&sig=HCLydcNdTj%2B4VTrrEehlzFnGh9AB61rsbmcmT7cdq5M%3D`;
    private containerUrl = new Azure.ContainerURL(
        `https://${this.accountName}.blob.core.windows.net/${this.containerName}?${this.sasString}`,
        Azure.StorageURL.newPipeline(new Azure.AnonymousCredential));
    constructor(private handleError: HandleError) { }
    // createContainer() {
    //     return new Observable(() => {
    //         this.containerUrl.create(Azure.Aborter.none);
    //     });
    // }

    // uploadFile(file: File): Observable<any> {
    //     const blockBlobURL = Azure.BlockBlobURL.fromContainerURL(this.containerUrl, file.name);
    //     return new Observable(() => {
    //         Azure.uploadBrowserDataToBlockBlob(
    //             Azure.Aborter.none, file, blockBlobURL);
    //     }).pipe(catchError(this.handleError.handleError));
    // }

    uploadFile(file: File) {
        const blockBlobURL = Azure.BlockBlobURL.fromContainerURL(this.containerUrl, file.name);
        return from(Azure.uploadBrowserDataToBlockBlob(Azure.Aborter.none, file, blockBlobURL))
            .pipe(catchError(this.handleError.handleError));
        // Azure.uploadBrowserDataToBlockBlob(
        //     Azure.Aborter.none, file, blockBlobURL).then((res) => {
        //         console.log(res);
        //     }, (reject) => {
        //         console.log(reject);
        //     });
    }

}
