import { UserStatusTypes } from "../../enums/status-type.enum";
import { UserTypes } from "../../enums/user-type.enum";
import { City } from "../../../../general/city/entities/city.entity";
import { Department } from "../../../../general/department/entities/departament.entity";
import { Country } from "../../../../general/country/entities/country.entity";
import { UserDocumentTypes } from "../../../../common/enum/document-type.enum";

export const userId = '93DB1910-667E-EE11-B0DB-D59CC639059E'

export const country: Country = {
  id: '93DB1910-667E-EE11-B0DB-D59CC639059F',
  createdAt: new Date('2023-11-08 13:38:52.693'),
  updatedAt: new Date('2023-11-14 16:46:00.626'),
  deletedAt: null,
  code: 2,
  name: "Atlantico",
}

export const department: Department = {
  id: '93DB1910-667E-EE11-B0DB-D59CC639059G',
  createdAt: new Date('2023-11-08 13:38:52.693'),
  updatedAt: new Date('2023-11-14 16:46:00.626'),
  deletedAt: null,
  code: 2,
  name: "Atlantico",
  country
}

export const city: City = {
  id: '93DB1910-667E-EE11-B0DB-D59CC639059H',
  createdAt: new Date('2023-11-08 13:38:52.693'),
  updatedAt: new Date('2023-11-14 16:46:00.626'),
  deletedAt: null,
  code: 1,
  name: "Barranquilla",
  department,
}

export const userStub = {
  createdAt: new Date('2023-11-08 13:38:52.693'),
  updatedAt: new Date('2023-11-14 16:46:00.626'),
  deletedAt: null,
  name: 'Nicolas',
  middleName: null,
  lastName: "Gonzalez",
  secondSurname: null,
  email: 'ngonzalez@comercializadora-s3.com',
  password: '$2b$10$MqSrd.A1Rxn2Tgvk1p361ezKJpIKkd76UOhQw.iXVnLekRtn.kH26',
  identificationType: UserDocumentTypes.CitizenshipCard,
  identificationNumber: "1094961974",
  phoneCountryCode: "57",
  phoneNumber: "3167951928",
  country,
  department,
  city,
  address: "Calle 9",
  confirmationCode: "12345",
  status: UserStatusTypes.Inactive,
  type: UserTypes.User,
  hasRural: false,
  legalRepresentativeIdentificationType: null,
  legalRepresentativeIdentificationNumber: null,
  roles: [],
  phoneVerification: true,
  emailVerification: false
};