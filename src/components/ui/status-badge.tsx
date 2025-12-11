'use client';

/**
 * Status Badge Component
 * Reusable status badge component with dynamic colors based on status
 * Supports comprehensive status cases for all tables across the application
 */

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export type StatusType =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'cancelled'
  | 'active'
  | 'inactive'
  | 'disabled'
  | 'in_progress'
  | 'not_started'
  | 'completed'
  | 'on_hold'
  | 'draft'
  | 'published'
  | 'archived'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'returned'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'in'
  | 'n'
  | 'c'
  | 'p'
  | 'a'
  | 'r'
  | string;

interface StatusBadgeProps {
  status: StatusType | { value: number; label: string } | null | undefined;
  className?: string;
}

const specificPendingStatuses = [
  'pending customer review',
  'pending shipping application details',
  'pending sales representative',
  'pending equipment team review',
  'pending planning team review',
  'pending documents from lms',
  'pending shipment',
  'pending document approval',
  'pending customer payment',
  'equipment check stage',
  'pending operation team review',
  'pending management team review',
  'signing booking note',
  'pending vice president signing',
  'pending pricing team review',
  'pending booking generation',
  'pending bol document generation',
  'pending invoice document generation',
  'pending obl/telex document',
  'pending liner response',
  'deprecated pending sales representative',
] as const;

const normalizeStatus = (statusValue: string) =>
  statusValue.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[_-]/g, ' ');

const exactMatch = (text: string, pattern: string): boolean => {
  const lowerText = text.toLowerCase();
  const lowerPattern = pattern.toLowerCase();
  if (lowerText === lowerPattern) return true;
  const wordBoundaryRegex = new RegExp(
    `\\b${lowerPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
    'i'
  );
  return wordBoundaryRegex.test(lowerText);
};

const isPendingStatus = (normalizedStatus: string): boolean => {
  if (specificPendingStatuses.some((s) => normalizedStatus.includes(s.toLowerCase()))) {
    return true;
  }
  if (normalizedStatus.startsWith('pending')) {
    return true;
  }
  return false;
};

const getStatusText = (
  status: StatusType | { value: number; label: string } | null | undefined
): string => {
  if (!status) return '';
  if (typeof status === 'object' && status !== null) {
    if ('label' in status && status.label) {
      return String(status.label);
    }
    if ('value' in status && typeof status.value !== 'undefined') {
      return String(status.value);
    }
  }
  return String(status);
};

/**
 * Comprehensive status color mapping
 * Covers all common status cases for tables including specific system statuses
 */
const getStatusColor = (
  status: StatusType | { value: number; label: string } | null | undefined
): string => {
  // Handle null/undefined
  if (!status) {
    return 'bg-gray-100 text-gray-800 border-gray-200';
  }

  // Check for specific numeric status values first
  if (typeof status === 'object' && !Array.isArray(status) && status !== null) {
    // Check if it has a value property (object with value and label)
    if ('value' in status && typeof status.value === 'number') {
      const statusValue = status.value;

      // Specific status value mappings
      // Success/Completed statuses
      if (statusValue === 4) {
        // Completed
        return 'bg-green-100 text-green-800 border-green-200';
      }

      // Error/Cancelled statuses
      if (statusValue === 5 || statusValue === 6) {
        // Lost, Canceled
        return 'bg-red-100 text-red-800 border-red-200';
      }

      // Warning/Needs Attention statuses
      if (
        statusValue === 1 ||
        statusValue === 7 ||
        statusValue === 202370007 ||
        statusValue === 202370019
      ) {
        // Draft (1), Revised (7), Returned statuses
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      }

      // All other numeric values are pending/in-progress (blue)
      // This includes: 2, 3, 202370001-202370006, 202370008-202370018, 202370020
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }

    // If object has label but no value, use the label
    if ('label' in status && status.label) {
      status = status.label as string;
    }
  }

  const statusValue = getStatusText(status);
  const normalizedStatus = normalizeStatus(statusValue);

  // ===== IN PROGRESS / PROCESSING / ACTIVE STATUSES =====
  // Check these FIRST to avoid false matches with success statuses
  if (isPendingStatus(normalizedStatus)) {
    return 'bg-blue-100 text-blue-800 border-blue-200';
  }

  // Then check general patterns
  const inProgressStatuses = [
    'in progress',
    'inprogress',
    'in-progress',
    'in_progress',
    'processing',
    'pending',
    'pend',
    'waiting',
    'awaiting',
    'queued',
    'shipped',
    'shipping',
    'in transit',
    'intransit',
    'on route',
    'onroute',
    'running',
    'ongoing',
    'current',
  ];
  if (inProgressStatuses.some((s) => exactMatch(normalizedStatus, s))) {
    return 'bg-blue-100 text-blue-800 border-blue-200';
  }

  // Single character check for 'p' or 'in' (only if not already matched)
  if (normalizedStatus === 'p' || normalizedStatus === 'in') {
    return 'bg-blue-100 text-blue-800 border-blue-200';
  }

  // ===== SUCCESS / COMPLETED / POSITIVE STATUSES =====
  // Check these AFTER pending statuses to avoid conflicts
  const successStatuses = [
    'completed',
    'complete',
    'done',
    'finished',
    'closed',
    'approved',
    'approve',
    'accepted',
    'confirmed',
    'confirm',
    'delivered',
    'delivery',
    'arrived',
    'arrival',
    'published',
    'publish',
    'activated',
    'success',
    'successful',
    'succeeded',
    'passed',
    'won',
    'win',
  ];
  if (successStatuses.some((s) => exactMatch(normalizedStatus, s))) {
    return 'bg-green-100 text-green-800 border-green-200';
  }

  // Check single character abbreviations (exact match only)
  if (normalizedStatus === 'c' || normalizedStatus === 'a') {
    return 'bg-green-100 text-green-800 border-green-200';
  }

  // Check for "active" as a standalone word (not "inactive")
  if (normalizedStatus === 'active') {
    return 'bg-green-100 text-green-800 border-green-200';
  }

  // ===== WARNING / ON HOLD / ATTENTION STATUSES =====
  const warningStatuses = [
    'on hold',
    'onhold',
    'hold',
    'paused',
    'pause',
    'draft',
    'drafts',
    'review',
    'reviewing',
    'under review',
    'warning',
    'warn',
    'attention',
    'needs attention',
    'revised',
    'returned from customer',
    'returned pending sales representative',
  ];
  if (warningStatuses.some((s) => normalizedStatus.includes(s.toLowerCase()))) {
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  }

  // Check for "returned" at the start
  if (normalizedStatus.startsWith('returned')) {
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  }

  // Exact match for "revised"
  if (exactMatch(normalizedStatus, 'revised') || exactMatch(normalizedStatus, 'draft')) {
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  }

  // ===== ERROR / REJECTED / CANCELLED / NEGATIVE STATUSES =====
  const errorStatuses = [
    'rejected',
    'reject',
    'denied',
    'declined',
    'failed',
    'failure',
    'cancelled',
    'canceled',
    'cancel',
    'cancellation',
    'error',
    'not started',
    'notstarted',
    'inactive',
    'inactivated',
    'disabled',
    'disable',
    'lost',
    'archived',
    'archive',
    'deleted',
    'delete',
  ];
  if (errorStatuses.some((s) => exactMatch(normalizedStatus, s))) {
    return 'bg-red-100 text-red-800 border-red-200';
  }

  // Single character check for 'r' or 'n' (error states)
  if (normalizedStatus === 'r' || normalizedStatus === 'n') {
    return 'bg-red-100 text-red-800 border-red-200';
  }

  // ===== INFO / NEUTRAL STATUSES =====
  const infoStatuses = ['info', 'information', 'neutral', 'unknown', 'unspecified'];
  if (infoStatuses.some((s) => normalizedStatus.includes(s))) {
    return 'bg-gray-100 text-gray-800 border-gray-200';
  }

  // Default color for unknown statuses
  return 'bg-gray-100 text-gray-800 border-gray-200';
};

/**
 * Extract label from status value
 */
const getStatusLabel = (
  status: StatusType | { value: number; label: string } | null | undefined
): string => {
  if (!status) {
    return 'Unknown';
  }

  const statusText = getStatusText(status);
  const normalizedStatus = normalizeStatus(statusText);

  if (isPendingStatus(normalizedStatus)) {
    return 'Pending';
  }

  return statusText || 'Unknown';
};

/**
 * StatusBadge Component
 *
 * @example
 * ```tsx
 * // String status
 * <StatusBadge status="pending" />
 *
 * // Object status
 * <StatusBadge status={{ value: 1, label: "In Progress" }} />
 *
 * // In table column render
 * {
 *   key: 'status',
 *   label: 'Status',
 *   render: (value, row) => <StatusBadge status={row.status} />
 * }
 * ```
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colorClass = getStatusColor(status);
  const label = getStatusLabel(status);

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('StatusBadge Debug:', {
      status,
      label,
      colorClass,
      type: typeof status,
      isObject: typeof status === 'object' && status !== null,
      hasValue: typeof status === 'object' && status !== null && 'value' in status,
      hasLabel: typeof status === 'object' && status !== null && 'label' in status,
    });
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border w-24',
        colorClass,
        className
      )}
    >
      {label}
    </span>
  );
}
