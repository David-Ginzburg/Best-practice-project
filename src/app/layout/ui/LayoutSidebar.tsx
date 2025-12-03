import { useLocation } from "react-router-dom";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/shared/shadcn/ui/sidebar";
import { TransitionLink } from "@/shared/components/transition-link/TransitionLink";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import { TypographyLarge } from "@/shared/components/typography";
import { menuItems } from "../model/const";

export const LayoutSidebar = () => {
	const location = useLocation();

	return (
		<Sidebar>
			<SidebarHeader className="flex items-center justify-between px-4 py-2">
				<TypographyLarge>Dashboard</TypographyLarge>
				<ThemeToggle />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => {
								const isActive = location.pathname === item.url;
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild isActive={isActive}>
											<TransitionLink to={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</TransitionLink>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};
