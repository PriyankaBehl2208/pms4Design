import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Notiflix from 'notiflix';
import { SessionService } from '../../Services/session.service';
import { ServicesService } from '../../Services/services.service';
import { FINAL_SAVE, GET_ENGINEVALUE, GETMAIN_LIST, REMARKS_VAL } from '../../Model/Model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap : any;
@Component({
  selector: 'app-prepdi-disptach',
  imports: [CommonModule,FormsModule],
  templateUrl: './prepdi-disptach.component.html',
  styleUrl: './prepdi-disptach.component.css'
})


export class PREPDIDISPTACHComponent {

 

@ViewChild('video') video!: ElementRef;
@ViewChild('canvas') canvas!: ElementRef;
  showPopup = false;
remarkId: Number=0;
jobId: string ='';
  scannedResult_Model: string = '';
  scannedResult_ID_NO: string = '';
  scannedResult_SERIAL_NO: string = '';
 capturedImage?: string | null = null;
  videoElement: any;
videoStream: MediaStream | null = null;

GET_ENGINEVALUE!:GET_ENGINEVALUE;

FINAL_SAVE!:FINAL_SAVE;


REMARKS_VAL!:REMARKS_VAL;


  ID_NO: string="";

  
  SerialNO: string="";
  USERNAME: string="";
  uploadStatus: string="";
  Notes:string="";

  Remarks: string="";

  Department : string="";
  Pin: string="";
  Model_NO: string="";
  Engine_NO: string="";
  Name: string="";
// videoStream: MediaStream | null = null;

  GETMAIN_LIST!:GETMAIN_LIST;
 showCamera = false;
  zoom=1;
  private mediaStream: MediaStream | null = null;




 extractedText = '';
   extractedText2 = '';
  isLoading = false;
   isLoading2 = false;
 private apiKey = 'K86445847188957'; // <-- replace with your OCR.space key
  
    responseData: any[]=[];

 constructor(private router:Router,private apiService:ServicesService,private http: HttpClient,private sessionService: SessionService){
  
  }



  onFileSelected(event: Event): void {
    Notiflix.Loading.circle();
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('apikey', this.apiKey);formData.append('apikey', this.apiKey);
    formData.append('language', 'eng');
    formData.append('isOverlayRequired', 'false');
    formData.append('scale', 'true');
    formData.append('OCREngine', '2');
   
    debugger;
    this.isLoading = true;
 debugger;
    this.http.post<any>('https://api.ocr.space/parse/image', formData)
      .subscribe({
        next: res => {
          debugger;
          const parsed = res?.ParsedResults?.[0]?.ParsedText?.trim() || 'No text found';
          this.extractedText = parsed;
debugger;
const rawText = parsed;
const match = rawText.match(/>([^<]+)</);
const extractedValue = match?.[1] || 'Value not found';
 this.extractedText = extractedValue;
 this.Pin=extractedValue;
console.log('Extracted:', extractedValue);
this.GETVALUE();
 Notiflix.Loading.remove();

        },
        error: err => {
          console.error('OCR error:', err);
          this.extractedText = 'OCR failed.';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }




FinalSAVE()
{


  debugger;
  this.FINAL_SAVE={}
  this.FINAL_SAVE.Engine_no=this.Engine_NO;

 debugger;
 this.apiService.FINAL_SAVE_ENGINE(this.FINAL_SAVE).subscribe({
      
         next:(response)=>{
           if(response.statusCode==200)
             {
             if(response.message.length==0)
             {
               
               
               this.Pin="";
             }
             else
              {
                
               debugger;
               if(response.message[0].checkCount=='0')
               {


                Notiflix.Notify.success("Saved Sucessfully");

              window.location.reload();

               }
               else
               {

               Notiflix.Notify.info("Please Complete the Checklist Before Closing");

               }
               //this.responseData=response.message;

              

             }
         
         }
         else{
           Notiflix.Notify.failure(response.message);
           return;
         }
       
        }
      })


}




OK()
{

  debugger;
 
   this.GETMAIN_LIST={};
this.GETMAIN_LIST.Department=this.Department;
this.GETMAIN_LIST.Engineno=this.Engine_NO;
this.GETMAIN_LIST.Modelno=this.Model_NO;
this.GETMAIN_LIST.Name= this.sessionService.getItem('LOGINAME');;
this.GETMAIN_LIST.Pin=this.Pin;
  debugger;

    if(this.Department!="" && this.Engine_NO!="" && this.Model_NO!=""  && this.Pin!="")
    {

     this.apiService.GETMAIN_LIST(this.GETMAIN_LIST).subscribe({
      
         next:(response)=>{
           if(response.statusCode==200)
             {
               debugger;
             if(response.message==null)
             {
               
               Notiflix.Notify.failure("CHECKED AND CLOSED");
               
             }
             else
              {
                
               debugger;
               
               this.responseData=response.message;
              
             }
         
         }
         else{
           Notiflix.Notify.failure(response.message);
           return;
         }
       
        }
      })


    }
    else
      {

        alert("Plesae fill all fields");
      }    
  
  
  }




logout()
  {
    
  }



  home()
 {
  
 this.router.navigate(['/dash']);

 }



selectedImage: string = '';

openImageModal(imagePath: string) {
  this.selectedImage = imagePath;

  // Show the modal using Bootstrap's JS API
  const modalElement = document.getElementById('imageModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}


selectedRow: any = null;

openModal(rowData: any): void {
  this.selectedRow = rowData;
  // Optional: Do something with the row (e.g., log, prepare modal data, etc.)
  console.log('Selected row:', this.selectedRow);
this.openCamera();

  //alert(this.selectedRow.id);
}




openCamera() {
  // Stop any existing stream
  if (this.videoStream) {
    this.videoStream.getTracks().forEach(track => track.stop());
  }

  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => {
      this.videoStream = stream;
      this.video.nativeElement.srcObject = stream;
    })
    .catch(error => {
      console.error('Camera error:', error);
    });
}





 capture() {
  debugger;

    debugger;
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png');

   
    const blob = this.dataURItoBlob(imageData);
    const formData = new FormData();
    formData.append('File', blob);
       formData.append('Engineno', this.Engine_NO);

    // formData.append('Createdby', this.sessionService.getItem('LOGINAME'));
    formData.append('MASTER_ID', this.selectedRow);


    debugger;
// Get token from sessionStorage
const authToken = sessionStorage.getItem('authToken');

// Create headers with Authorization
const headers = new HttpHeaders({
  'Authorization': `Bearer ${authToken}`
});

// Send POST request with headers
this.http.post(
  //'https://emfg.escortskubota.com/IREPORTER_FG_API/api/IREPORTERFG/UploadImage',
  'https://localhost:7211/api/MesChecklist/UploadImage',
  formData,
  { headers }
).subscribe({
  next: () => {

    debugger;
    this.uploadStatus = '';
     this.OK();
  },
  error: () => {
    this.uploadStatus = 'Failed to upload data.';
  }
});


      const modalEl = document.getElementById('checklistModal');
  if (modalEl) {
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
      modalInstance.hide();
     
    }
  }
//Notiflix.Notify.success('Image uploaded successfully!');


    // You can send this data to your server or display it
  }





  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }



  closeCamera() {
    this.showCamera = false;
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
  }




  RemarkSave()
  {

  this.REMARKS_VAL={}
this.REMARKS_VAL.Remarks_ID=this.remarkId.toString();
this.REMARKS_VAL.Remarks=this.Remarks;


 this.apiService.UPDATE_REMARKS(this.REMARKS_VAL).subscribe({
      
         next:(response)=>{
           if(response.statusCode==200)
             {
             if(response.message.length==0)
             {
               
               Notiflix.Notify.failure("Please Scan Only Plate");
               this.Pin="";
             }
             else
              {
                
               debugger;
               
               this.responseData=response.message;

              //  this.Engine_NO=response.message[0].enginE_SRNO;
              // this.Model_NO=response.message[0].model;

             }
         
         }
         else{
           Notiflix.Notify.failure(response.message);
           return;
         }
       
        }
      })
  }




  OnRemarks(index: number)
 {


  this.remarkId=index;

 

 }




GETVALUE()
{

  this.GET_ENGINEVALUE={}
this.GET_ENGINEVALUE.Pin=this.Pin;
 this.apiService.GET_VALUE_ENGINE(this.GET_ENGINEVALUE).subscribe({
      
         next:(response)=>{
           if(response.statusCode==200)
             {
             if(response.message.length==0)
             {
               
               Notiflix.Notify.failure("Please Scan Only Plate");
               this.Pin="";
             }
             else
              {
                
               debugger;
               
               this.responseData=response.message;

               this.Engine_NO=response.message[0].enginE_SRNO;
              this.Model_NO=response.message[0].model;

             }
         
         }
         else{
           Notiflix.Notify.failure(response.message);
           return;
         }
       
        }
      })

}





}
