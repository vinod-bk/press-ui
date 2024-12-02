import React from 'react';

interface FormField {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

interface DynamicFormProps {
  formData: { formFields: FormField[] };
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formData }) => {
  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'date':
        return (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <input
              type={field.type}
              className="form-control"
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        );
      case 'select':
        return (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <select
              className="form-select"
              name={field.name}
              required={field.required}
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      case 'textarea':
        return (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <textarea
              className="form-control"
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              rows={4}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form className="dynamic-form">
      {formData.formFields.map(renderField)}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;