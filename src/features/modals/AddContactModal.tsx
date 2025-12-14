import React, { useState } from 'react';
import './addContactModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { createContact, CreateContactRequestBody, getAddressViaCep } from '../session/navigationSlice';
import { toast } from 'react-toastify';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onAssociationSelect?: (associationType: string) => void;
}

interface ContactFormData {
  name: string;
  cpf: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

const AddContactModal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title,
  onAssociationSelect
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    cpf: '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const dispatch = useDispatch<AppDispatch>();
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  async function handleCreateContact(formData: CreateContactRequestBody) {
    const response = await dispatch(createContact({
      authHeaders: authHeaders,
      requestBody: formData
    }));
    
    if (response.meta.requestStatus === 'rejected') {
      toast.error(response.payload as string);
    } else if (response.meta.requestStatus === 'fulfilled') {
      toast.success('Contact created!'); 
    }
  }


  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5, 8);
    }

    setFormData(prev => ({
      ...prev,
      cep: value
    }));

    if (value.replace(/\D/g, '').length === 9) {
      handleCepSearch(value);
    }
  };

  const handleCepSearch = async (cep?: string) => {
  const cepToSearch = cep || formData.cep.replace(/\D/g, '');
  
  if (cepToSearch.length !== 8) {
    alert('CEP need to have 8 numbers!');
    return;
  }

  try {
    
    const response = await dispatch(getAddressViaCep({
      authHeaders: authHeaders,
      cep: cepToSearch
    }));
    

    if (response && (
        response.meta?.requestStatus === 'fulfilled' || 
        response.payload ||
        (response.type && response.type.includes('fulfilled'))
    )) {
      const data = response.payload || response;
      
      setFormData(prev => ({
        ...prev,
        street: data.logradouro || data.street || '',
        neighborhood: data.bairro || data.neighborhood || '',
        city: data.localidade || data.city || '',
        state: data.uf || data.state || ''
      }));
      
    } else {
      alert('CEP não encontrado ou formato de resposta inesperado');
    }
  } catch (error) {
    alert('Erro ao buscar CEP');
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error('Name and phone need to be filled')
      return;
    }

    handleCreateContact(formData)
    
    // alert('Contact created!');
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className='modal-content' onClick={handleContentClick}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="container-contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name and surname"
                  required
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  placeholder="000.000.000-00"
                  maxLength={14}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                  required
                  maxLength={15}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cep">CEP *</label>
                <div className="cep-container">
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    onChange={handleCepChange}
                    placeholder="00000-000"
                    required
                    maxLength={9}
                  />
                  <button 
                    type="button" 
                    onClick={() => handleCepSearch()}
                    className="cep-search-button"
                  >
                    Buscar
                  </button>
                </div>
              </div>

              <div className="address-grid">
                <div className="form-group">
                  <label htmlFor="street">Street *</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Street..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="number">Number *</label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="complement">Additional address information</label>
                  <input
                    type="text"
                    id="complement"
                    name="complement"
                    value={formData.complement}
                    onChange={handleInputChange}
                    placeholder="Apto, Sala, etc."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="neighborhood">Bairro *</label>
                  <input
                    type="text"
                    id="neighborhood"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    placeholder="Bairro"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">Cidade *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Cidade"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">Estado *</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-button">
                  Cadastrar Contato
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;