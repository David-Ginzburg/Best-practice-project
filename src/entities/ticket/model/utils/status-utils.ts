import { PRIORITY_CONFIG } from "../priority-config";
import { STATUS_CONFIG } from "../status-config";
import type { TicketStatus, TicketPriority } from "../types";
import { getConfig } from "./config-utils";

export const getStatusColor = (status: TicketStatus): string => {
	return getConfig(STATUS_CONFIG, status).color;
};

export const getStatusLabel = (status: TicketStatus): string => {
	return getConfig(STATUS_CONFIG, status).label;
};

export const getPriorityColor = (priority: TicketPriority): string => {
	return getConfig(PRIORITY_CONFIG, priority).color;
};

export const getPriorityLabel = (priority: TicketPriority): string => {
	return getConfig(PRIORITY_CONFIG, priority).label;
};
