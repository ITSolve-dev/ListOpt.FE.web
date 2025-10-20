import { useHydrationContext } from "@/shared/providers";

/**
 * A higher-order component that wraps a component and displays a loader
 * instead of the component until the app is hydrated.
 *
 * @param Component - The component to hydrate.
 * @param loader - The component to display while the app is not hydrated.
 * @returns A new component that wraps the passed component and displays the
 * loader until hydration is complete.
 *
 * @example
 * import { WithHydrationHoc } from '@/shared/WithHydrationHoc';
 * import Loader from '@/components/Loader';
 *
 * export default WithHydrationHoc(MyComponent, Loader);
 */
export function withHydrationHoc<PropType>(
	Component: (props: PropType) => React.ReactNode,
	loader?: () => React.ReactNode,
) {
	return function HydratedComponent(props: PropType) {
		const hydrated = useHydrationContext();
		return hydrated ? Component(props) : loader?.();
	};
}
