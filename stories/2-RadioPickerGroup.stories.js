import React from 'react';
import { Image } from 'react-bootstrap';

import RadioPickerGroup from 'components/RadioPickerGroup';

export default {
  title: 'RadioPickerGroup',
};

const makeRadioPickerGroup = (props = {}) => () => {
  const [value, setValue] = React.useState('a');

  const handleChange = event => {
    console.log('handleChange');
    setValue(event.target.value);
  };

  return (
    <RadioPickerGroup
      {...props}
      selectedValue={value}
      name="RadioPickerGroup"
      onChange={handleChange}
    >
      <RadioPickerGroup.Choice value="a">option A</RadioPickerGroup.Choice>
      <RadioPickerGroup.Choice value="b">option B</RadioPickerGroup.Choice>
      <RadioPickerGroup.Choice value="c">option C</RadioPickerGroup.Choice>
    </RadioPickerGroup>
  );
};

export const defaultComponent = makeRadioPickerGroup();
export const successEmphasis = makeRadioPickerGroup({ emphasis: 'success' });
export const dangerEmphasis = makeRadioPickerGroup({ emphasis: 'danger' });

export const hidingRadioIndicator = () => {
  const [value, setValue] = React.useState('a');

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <RadioPickerGroup
      selectedValue={value}
      name="RadioPickerGroup"
      onChange={handleChange}
      hideIndicator
    >
      <RadioPickerGroup.Choice value="a">
        <Image src="https://placeimg.com/50/50/nature" circle />
        <span style={{ marginLeft: '20px' }}>option A</span>
      </RadioPickerGroup.Choice>
      <RadioPickerGroup.Choice value="b">
        <Image src="https://placeimg.com/50/50/animals" circle />
        <span style={{ marginLeft: '20px' }}>option B</span>
      </RadioPickerGroup.Choice>
      <RadioPickerGroup.Choice value="c">
        <Image src="https://placeimg.com/50/50/tech" circle />
        <span style={{ marginLeft: '20px' }}>option C</span>
      </RadioPickerGroup.Choice>
    </RadioPickerGroup>
  );
};

export const showingConditionalElements = () => {
  const [value, setValue] = React.useState('a');

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <RadioPickerGroup
      selectedValue={value}
      name="RadioPickerGroup"
      onChange={handleChange}
    >
      <RadioPickerGroup.Choice value="a">
        <strong>option A</strong>
        <RadioPickerGroup.IfChecked>
          <p>
            Lorem fistrum amatomaa torpedo ese que llega te voy a borrar el
            cerito. Hasta luego Lucas pecador está la cosa muy malar llevame al
            sircoo va usté muy cargadoo quietooor qué dise usteer al ataquerl la
            caidita papaar papaar a peich. Quietooor quietooor apetecan papaar
            papaar hasta luego Lucas condemor a gramenawer. La caidita torpedo
            sexuarl va usté muy cargadoo tiene musho peligro diodenoo. Diodenoo
            fistro pecador apetecan de la pradera diodenoo. Tiene musho peligro
            sexuarl llevame al sircoo diodenoo fistro ahorarr. Quietooor qué
            dise usteer pecador pecador se calle ustée está la cosa muy malar
            ahorarr hasta luego Lucas me cago en tus muelas. Por la gloria de mi
            madre diodeno qué dise usteer por la gloria de mi madre ese hombree
            ese hombree caballo blanco caballo negroorl papaar papaar. No te
            digo trigo por no llamarte Rodrigor pupita al ataquerl torpedo de la
            pradera qué dise usteer llevame al sircoo benemeritaar llevame al
            sircoo pecador.
          </p>
        </RadioPickerGroup.IfChecked>
      </RadioPickerGroup.Choice>
      <RadioPickerGroup.Choice value="b">
        <strong>option B</strong>
        <RadioPickerGroup.IfChecked>
          <p>
            Lorem fistrum a wan ese que llega diodenoo diodeno por la gloria de
            mi madre. Te voy a borrar el cerito ese que llega ahorarr papaar
            papaar a peich ahorarr. Por la gloria de mi madre no te digo trigo
            por no llamarte Rodrigor está la cosa muy malar está la cosa muy
            malar sexuarl a gramenawer apetecan. Torpedo quietooor va usté muy
            cargadoo a peich llevame al sircoo la caidita llevame al sircoo te
            voy a borrar el cerito apetecan. Fistro a peich a gramenawer te voy
            a borrar el cerito a peich ese pedazo de.
          </p>
        </RadioPickerGroup.IfChecked>
      </RadioPickerGroup.Choice>
      <RadioPickerGroup.Choice value="c">
        <strong>option C</strong>
        <RadioPickerGroup.IfChecked>
          <p>
            Lorem fistrum no te digo trigo por no llamarte Rodrigor qué dise
            usteer me cago en tus muelas. A peich te voy a borrar el cerito la
            caidita ese hombree no te digo trigo por no llamarte Rodrigor me
            cago en tus muelas. Va usté muy cargadoo llevame al sircoo te voy a
            borrar el cerito quietooor. A gramenawer tiene musho peligro está la
            cosa muy malar torpedo ahorarr. Apetecan jarl te voy a borrar el
            cerito ahorarr no te digo trigo por no llamarte Rodrigor condemor
            ese pedazo de la caidita. Mamaar llevame al sircoo va usté muy
            cargadoo ese pedazo de quietooor. Diodeno pupita diodenoo está la
            cosa muy malar caballo blanco caballo negroorl apetecan torpedo
            diodeno hasta luego Lucas está la cosa muy malar a peich.
          </p>
        </RadioPickerGroup.IfChecked>
      </RadioPickerGroup.Choice>
    </RadioPickerGroup>
  );
};
