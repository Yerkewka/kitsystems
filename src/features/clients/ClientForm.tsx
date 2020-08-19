import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { RootStoreContext } from '../../app/store/rootStore';
import { IClientFormInputs } from '../../app/models/clients';
import TextField from '@material-ui/core/TextField';

const ClientForm = () => {
  const rootStore = useContext(RootStoreContext);

  const { handleSubmit, errors, control } = useForm<IClientFormInputs>();
  return (
    <form onSubmit={handleSubmit((data) => {})}>
      <Controller
        as={TextField}
        name="name"
        control={control}
        label="Наименование компании"
      />
    </form>
  );
};

export default ClientForm;
