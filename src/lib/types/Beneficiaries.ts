interface MetaData {
  total: number;
  pages: number;
  previous: string | null;
  next: string | null;
}

export interface Beneficiary {
  id: string;
  nickName: string;
}

export interface Beneficiaries {
  meta: MetaData;
  beneficiaries: Beneficiary[];
}
