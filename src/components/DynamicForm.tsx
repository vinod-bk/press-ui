import React, { useState, useCallback, useEffect } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, {Dayjs} from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

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

const renderDateField = (
  field: FormField,
  formState: any,
  handleDateFieldChange: (date: Dayjs | null, name: string) => void
) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {" "}
      <DateField
        key={field.name}
        label={field.label}
        name={field.name}
        required={field.required}
        InputProps={{ readOnly: field.readOnly }}
        value={formState[field.name] ? dayjs(formState[field.name]) : null}
        onChange={(e) =>
          handleDateFieldChange(dayjs(e), field.name)
        }
        format="DD-MM-YYYY"
        fullWidth
        margin="normal"
        size="small"
      />
    </LocalizationProvider>
  );
};

const renderTextField = (
  field: FormField,
  formState: any,
  handleTextFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
  return (
    <TextField
      key={field.name}
      label={field.label}
      type={field.type}
      name={field.name}
      placeholder={field.placeholder}
      required={field.required}
      InputProps={{ readOnly: field.readOnly }}
      value={formState[field.name] || ""}
      onChange={handleTextFieldChange}
      fullWidth
      margin="normal"
      size="small"
    />
  );
};

const renderSelectField = (
  field: FormField,
  formState: any,
  handleSelectFieldChange: (e: SelectChangeEvent<HTMLSelectElement>) => void
) => {
  return (
    <FormControl fullWidth margin="normal" key={field.name}>
      <InputLabel>{field.label}</InputLabel>
      <Select
        name={field.name}
        value={formState[field.name] || ""}
        onChange={handleSelectFieldChange}
        required={field.required}
      >
        {field.options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const renderTextareaField = (
  field: FormField,
  formState: any,
  handleTextareaFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
) => {
  return (
    <TextField
      key={field.name}
      label={field.label}
      name={field.name}
      placeholder={field.placeholder}
      required={field.required}
      InputProps={{ readOnly: field.readOnly }}
      value={formState[field.name] || ""}
      onChange={handleTextareaFieldChange}
      fullWidth
      margin="normal"
      multiline
      rows={4}
    />
  );
};

const ListItem: React.FC<{
  subField: FormField;
  item: any;
  idx: number;
  handleListChange: (index: number, field: string, value: any) => void;
  displayOnly: boolean;
}> = ({ subField, item, idx, handleListChange, displayOnly }) => (
  <TableCell key={subField.name}>
    <TextField
      type={subField.type}
      name={subField.name}
      placeholder={subField.placeholder}
      required={subField.required}
      InputProps={{
        readOnly:
          subField.readOnly || displayOnly || subField.name === "serialNumber",
      }}
      value={item[subField.name] || ""}
      onChange={(e) => handleListChange(idx, subField.name!, e.target.value)}
      fullWidth
      size="small"
    />
  </TableCell>
);

const renderListField = (
  field: FormField,
  formState: any,
  handleListChange: (index: number, field: string, value: any) => void,
  setFormState: React.Dispatch<React.SetStateAction<any>>,
  displayOnly: boolean
) => {
  return (
    <div key={field.name}>
      <InputLabel>{field.label}</InputLabel>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {field.fields?.map((subField) => (
                <TableCell key={subField.name}>{subField.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(formState[field.name] || []).map((item: any, idx: number) => (
              <TableRow key={idx}>
                {field.fields?.map((subField) => (
                  <ListItem
                    key={subField.name}
                    subField={subField}
                    item={item}
                    idx={idx}
                    handleListChange={handleListChange}
                    displayOnly={displayOnly}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!displayOnly && (
        <Button
          // variant="contained"
          color="secondary"
          onClick={() =>
            setFormState((prevState: any) => ({
              ...prevState,
              [field.name!]: [
                ...(prevState[field.name] || []),
                { serialNumber: (prevState[field.name]?.length || 0) + 1 },
              ],
            }))
          }
          style={{ marginTop: "16px" }}
        >
          Add Item
        </Button>
      )}
    </div>
  );
};

const DynamicForm: React.FC<DynamicFormProps> = ({
  formData,
  initialFormState = {},
  displayOnly = false,
}) => {
  const [formState, setFormState] = useState<any>(initialFormState);

  useEffect(() => {
    // Initialize list fields with 5 default elements
    const initialListState = formData.formFields.reduce((acc, field) => {
      if (field.type === 'list') {
        acc[field.name!] = Array.from({ length: 5 }, (_, index) => ({ serialNumber: index + 1 }));
      }
      return acc;
    }, {} as any);

    setFormState((prevState: any) => ({
      ...prevState,
      ...initialListState,
    }));
  }, [formData.formFields]);

  const handleDateFieldChange = useCallback(
    (date: Dayjs | null, name: string) => {
      setFormState((prevState: any) => ({
        ...prevState,
        [name]: date,
      }));
    },
    []
  );

  const handleTextFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormState((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const handleSelectFieldChange = useCallback((e: SelectChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleTextareaFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const handleListChange = useCallback(
    (index: number, field: string, value: any) => {
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
    },
    [formState]
  );

  const handleClear = useCallback(() => {
    setFormState(initialFormState);
  }, [initialFormState]);

  return (
    <form>
      <Box>
        {formData.formFields.map((field) => {
          switch (field.type) {
            case "text":
            case "email":
            case "number":
              return renderTextField(field, formState, handleTextFieldChange);
            case "date":
              return renderDateField(field, formState, handleDateFieldChange);
            case "select":
              return renderSelectField(
                field,
                formState,
                handleSelectFieldChange
              );
            case "textarea":
              return renderTextareaField(
                field,
                formState,
                handleTextareaFieldChange
              );
            case "list":
              return renderListField(
                field,
                formState,
                handleListChange,
                setFormState,
                displayOnly
              );
            default:
              return null;
          }
        })}
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
        }}
      >
        <Button
          // variant="contained"
          color="secondary"
          onClick={handleClear}
          style={{ marginRight: "8px" }}
        >
          Clear
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;
