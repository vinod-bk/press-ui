import React from 'react';

interface FormButtonsProps {
  onClear: () => void;
}

const FormButtons: React.FC<FormButtonsProps> = ({ onClear }) => (
  <div className="d-flex justify-content-end mt-3">
    <button type="button" className="btn btn-secondary me-2" onClick={onClear}>
      Cancel
    </button>
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </div>
);

export default FormButtons;
