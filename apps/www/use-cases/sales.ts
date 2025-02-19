interface SalesQueryProps {}
export async function getSalesUseCase(type, query: SalesQueryProps) {}

export async function deleteSaleUseCase(salesId) {}
export async function salesFormUseCase(type, salesId) {}
export async function saveSalesUseCase(data) {}
