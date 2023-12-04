import { UUID } from "crypto";

export class ManufactoringCompany {
   id: UUID;
   name: string;
 
   constructor(id: UUID, name: string) {
     this.id = id;
     this.name = name;
   }

   public static GetAll():ManufactoringCompany[] {
      return [
         new ManufactoringCompany("26435709-4FF7-4016-9793-12AE59552ED1", "EliteCD Creations"),
         new ManufactoringCompany("2A65B49C-A0CF-4B0A-9A4C-E58C130A351F", "DigitalSound Productions"),
       ];
   }  
 }

