export interface Currencies {
	currencies: Currency[]
}

export interface Currency {
	ccy: string
	base_ccy: string
	buy: string
	sale: string
}
