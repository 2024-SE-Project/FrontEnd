// FilterDialog.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const FilterDialog = ({ open, onClose, searchCriteria, setSearchCriteria }) => {
  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>검색 기준 선택</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup
            value={searchCriteria}
            onChange={handleCriteriaChange}
          >
            <FormControlLabel value="title" control={<Radio />} label="제목" />
            <FormControlLabel value="content" control={<Radio />} label="내용" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>확인</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;