import { TemplateDocumentationPage } from "@/shared/ui/TemplateDocumentationPage";
import { faqItems, sections } from "../config";

export async function Customers() {
	return (
		<TemplateDocumentationPage
			sections={sections}
			faqItems={faqItems}
			page={"customers"}
		/>
	);
}
