import {FieldsOptions} from "../../../common/fields-options";

const fieldsOptions: FieldsOptions = {
  name: {
    id: 'name',
    label: 'Nome',
    validationMessage: {
      maxlength: 255
    }
  },
  description: {
    id: 'description',
    label: 'Descrição',
    validationMessage: {
      cols: 30,
      rows: 10
    }
  },
  price: {
    id: 'price',
    label: 'Preço',
    validationMessage: {
      min: 1
    }
  },
  active: {
    id: 'active',
    label: 'Ativa',
  }
};

export default fieldsOptions;
