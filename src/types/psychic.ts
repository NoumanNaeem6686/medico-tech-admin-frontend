import moment, { Moment } from "moment";
// types/psychic.ts
export interface Psychic {
    id: string;
    name: string;
    shortDescription: string;
    email: string;
    phoneNo: string;
    profileDescription:string;
    price: string;
    statusMessage:string;
    experience: string;
    languages: string[];
    topic: string[];
    tools: string[];
    abilities: string[];
    zodiacSign: string;
    joiningDate: string;
    description: string;
    profileUrl: string;
    profilePicId: String
  }
  

  export interface BankDetails {
    accountHolderName: string;
    bankName: string;
    bankAddress: string;
    accountNumber: string;
    iban: string;
    swiftCode: string;
  }
  
  export interface DoctorInfo {
    name: string;
    email: string;
    phone: string;
    experience: string;
    statusMessage: string;
    profileDescription: string;
    password: string;
    zodiac: string;
    price: string;
    shortDescription: string;
    languages: string[];
    joiningDate: string;
    description: string;
    country: string;
    topic: string[];
    tools: string[];
    abilities: string[];
    city: string;
    address: string;
    zipcode: number;
    availability: {
      startDate: Moment | null;
      endDate: Moment | null;
    };
    bankDetails?: BankDetails; // Add this line
  }
  