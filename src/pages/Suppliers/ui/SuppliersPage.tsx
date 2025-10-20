import { TemplateDocumentationPage } from "@/shared/ui/TemplateDocumentationPage";
import { faqItems, sections } from "../config";

export async function Suppliers() {
	return (
		<TemplateDocumentationPage
			sections={sections}
			faqItems={faqItems}
			page={"suppliers"}
		/>
	);
}
