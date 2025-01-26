import { InputType, Field } from '@nestjs/graphql';
import { CreateCardInput } from '../cards/dto/inputs/create-card.input';
import { CreateCardEmailInput } from '../cardsEmail/dto/inputs/create-card.input';
import { CreateCardPhoneInput } from '../cardsPhone/dto/inputs/create-card.input';
import { CreateCardSocialInput } from '../cardsSocial/dto/inputs/create-cardSocial.input';
import { CreateCardWebInput } from '../cardsWeb/dto/inputs/create-cardWeb.input';
import { CreateCardAddressInput } from '../cardsAddress/dto/inputs/create-cardAddress.input';
import { IsArray, IsObject, IsString } from 'class-validator';

@InputType()
export class CardsCreateInput {

  @Field(()=> String)
  @IsString()
  imageProfileId: string
  @Field(()=> CreateCardInput)
  @IsObject()
  card: CreateCardInput

  @Field(()=> [CreateCardEmailInput])
  @IsArray()
  cardEmail: CreateCardEmailInput[]

  @Field(()=> [CreateCardPhoneInput])
  @IsArray()
  cardPhone: CreateCardPhoneInput[]

  @IsArray()
  @Field(()=> [CreateCardSocialInput])
  cardSocial: CreateCardSocialInput[]

  @IsArray()
  @Field(()=> [CreateCardWebInput])
  cardWeb: CreateCardWebInput[]
  
  @IsArray()
  @Field(()=> [CreateCardAddressInput])
  cardAddress: CreateCardAddressInput[]
}
