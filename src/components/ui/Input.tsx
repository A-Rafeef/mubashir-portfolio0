import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, type = 'text', ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    return (
      <div className="relative w-full">
        <input
          id={inputId}
          ref={ref}
          type={type}
          placeholder=" "
          className={twMerge(
            clsx(
              "peer w-full px-4 pt-5 pb-2 text-base text-primary-text bg-white border rounded-[12px] transition-all duration-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary",
              error ? "border-danger focus:ring-danger focus:border-danger" : "border-neutral-border",
              className
            )
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={twMerge(
            clsx(
              "absolute left-4 top-3.5 text-secondary-text text-sm transition-all duration-200 origin-[0] transform -translate-y-3 scale-75 select-none pointer-events-none",
              "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base",
              "peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary",
              error && "peer-focus:text-danger text-danger/80"
            )
          )}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-xs text-danger font-medium pl-1">{error}</p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = 'FloatingInput';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FloatingTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, rows = 4, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
    return (
      <div className="relative w-full">
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          placeholder=" "
          className={twMerge(
            clsx(
              "peer w-full px-4 pt-5 pb-2 text-base text-primary-text bg-white border rounded-[12px] transition-all duration-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-y min-h-[100px]",
              error ? "border-danger focus:ring-danger focus:border-danger" : "border-neutral-border",
              className
            )
          )}
          {...props}
        />
        <label
          htmlFor={textareaId}
          className={twMerge(
            clsx(
              "absolute left-4 top-3.5 text-secondary-text text-sm transition-all duration-200 origin-[0] transform -translate-y-3 scale-75 select-none pointer-events-none",
              "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base",
              "peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary",
              error && "peer-focus:text-danger text-danger/80"
            )
          )}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-xs text-danger font-medium pl-1">{error}</p>
        )}
      </div>
    );
  }
);

FloatingTextarea.displayName = 'FloatingTextarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const FloatingSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, id, options, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
    return (
      <div className="relative w-full">
        <select
          id={selectId}
          ref={ref}
          className={twMerge(
            clsx(
              "peer w-full px-4 pt-5 pb-2 text-base text-primary-text bg-white border rounded-[12px] transition-all duration-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none",
              error ? "border-danger focus:ring-danger focus:border-danger" : "border-neutral-border",
              className
            )
          )}
          {...props}
        >
          <option value="" disabled hidden></option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 pt-3 text-secondary-text">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
        <label
          htmlFor={selectId}
          className={twMerge(
            clsx(
              "absolute left-4 top-3.5 text-secondary-text text-sm transition-all duration-200 origin-[0] transform -translate-y-3 scale-75 select-none pointer-events-none",
              "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base",
              "peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary",
              error && "peer-focus:text-danger text-danger/80"
            )
          )}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-xs text-danger font-medium pl-1">{error}</p>
        )}
      </div>
    );
  }
);

FloatingSelect.displayName = 'FloatingSelect';
