import { getDykeFormAction } from "@/app/(v2)/(loggedIn)/sales-v2/form/_action/get-dyke-form";
import SalesFormComponent from "@/app/(v2)/(loggedIn)/sales-v2/form/components";

export default async function EditQuotePage({ params, searchParams }) {
    const [type, slug] = params.typeAndSlug;
    const form = await getDykeFormAction(type, slug, searchParams);
    return (
        <>
            <div className="sm:px-8 px-4">
                <SalesFormComponent defaultValues={form} />
            </div>
        </>
    );
}
