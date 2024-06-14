export default function convertContact (dealDetails: any) {
	const  DEFAULT_SITUATION = 'A';
	const  DEFAULT_TYPE = 'J';

		interface contact {
			nome: string,
			situacao: string,
			celular: string,
			tipo: string,
			email: string
		}

		const contactPhone = dealDetails.person_id.phone.find((phone: { primary: boolean; }) => phone.primary === true);
		const contactEmail = dealDetails.person_id.email.find((email: { primary: boolean; }) => email.primary === true);

		const blingContactBody: contact = {
			nome: dealDetails.person_id.name,
			situacao: DEFAULT_SITUATION,
			celular: contactPhone.value,
			tipo: DEFAULT_TYPE,
			email: contactEmail.value
		};

		return blingContactBody;
}