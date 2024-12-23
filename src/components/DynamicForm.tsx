import React, { useState, useCallback } from 'react';

interface FormField {
  type: string;
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  options?: { value: string; label: string }[];
  fields?: FormField[];
  layout?: string;
}

interface DynamicFormProps {
  formData: { formFields: FormField[] };
  initialFormState?: any;
  displayOnly?: boolean;
}

const renderTextField = (field: FormField, formState: any, handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void) => {
  const fieldClass = field.layout === 'half' ? 'col-md-6' : 'col-md-12';
  return (
    <div className={`mb-3 ${fieldClass}`} key={field.name}>
      {field.label && <label className="form-label">{field.label}</label>}
      <input
        type={field.type}
        className="form-control"
        name={field.name}
        placeholder={field.placeholder}
        required={field.required}
        readOnly={field.readOnly}
        value={formState[field.name] || ''}
        onChange={handleInputChange}
      />
    </div>
  );
};

const renderSelectField = (field: FormField, formState: any, handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void) => {
  const fieldClass = field.layout === 'half' ? 'col-md-6' : 'col-md-12';
  return (
    <div className={`mb-3 ${fieldClass}`} key={field.name}>
      {field.label && <label className="form-label">{field.label}</label>}
      <select
        className="form-select"
        name={field.name}
        required={field.required}
        value={formState[field.name] || ''}
        onChange={handleInputChange}
      >
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const renderTextareaField = (field: FormField, formState: any, handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void) => {
  const fieldClass = field.layout === 'half' ? 'col-md-6' : 'col-md-12';
  return (
    <div className={`mb-3 ${fieldClass}`} key={field.name}>
      {field.label && <label className="form-label">{field.label}</label>}
      <textarea
        className="form-control"
        name={field.name}
        placeholder={field.placeholder}
        required={field.required}
        rows={4}
        value={formState[field.name] || ''}
        onChange={handleInputChange}
      />
    </div>
  );
};

const ListItem: React.FC<{ subField: FormField; item: any; idx: number; handleListChange: (index: number, field: string, value: any) => void; displayOnly: boolean }> = ({ subField, item, idx, handleListChange, displayOnly }) => (
  <td key={subField.name}>
    <input
      type={subField.type}
      className="form-control"
      name={subField.name}
      placeholder={subField.placeholder}
      required={subField.required}
      readOnly={subField.readOnly || displayOnly || subField.name === 'serialNumber'}
      value={item[subField.name] || ''}
      onChange={(e) => handleListChange(idx, subField.name!, e.target.value)}
      style={displayOnly ? { pointerEvents: 'none' } : {}}
    />
  </td>
);

const renderListField = (field: FormField, formState: any, handleListChange: (index: number, field: string, value: any) => void, setFormState: React.Dispatch<React.SetStateAction<any>>, displayOnly: boolean) => {
  return (
    <div className="mb-3" key={field.name}>
      {field.label && <label className="form-label">{field.label}</label>}
      <table className="table">
        <thead>
          <tr>
            {field.fields?.map((subField) => (
              <th key={subField.name}>{subField.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(formState[field.name] || []).map((item: any, idx: number) => (
            <tr key={idx}>
              {field.fields?.map((subField) => (
                <ListItem key={subField.name} subField={subField} item={item} idx={idx} handleListChange={handleListChange} displayOnly={displayOnly} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!displayOnly && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setFormState((prevState: any) => ({
            ...prevState,
            [field.name!]: [...(prevState[field.name] || []), { serialNumber: (prevState[field.name]?.length || 0) + 1 }],
          }))}
        >
          Add Item
        </button>
      )}
    </div>
  );
};

const DynamicForm: React.FC<DynamicFormProps> = ({ formData, initialFormState = {}, displayOnly = false }) => {
  const [formState, setFormState] = useState<any>(initialFormState);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleListChange = useCallback((index: number, field: string, value: any) => {
    const updatedList = [...(formState.orderDetails || [])];
    updatedList[index] = {
      ...updatedList[index],
      [field]: value,
      amount: updatedList[index].quantity * updatedList[index].rate,
    };
    setFormState((prevState: any) => ({
      ...prevState,
      orderDetails: updatedList,
    }));
  }, [formState]);

  const handleClear = useCallback(() => {
    setFormState(initialFormState);
  }, [initialFormState]);

  return (
    <form className="dynamic-form">
      <div className="row">
        {formData.formFields.map((field) => {
          switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
            case 'date':
              return renderTextField(field, formState, handleInputChange);
            case 'select':
              return renderSelectField(field, formState, handleInputChange);
            case 'textarea':
              return renderTextareaField(field, formState, handleInputChange);
            case 'list':
              return renderListField(field, formState, handleListChange, setFormState, displayOnly);
            default:
              return null;
          }
        })}
      </div>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={handleClear}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;