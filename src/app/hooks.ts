import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useTranslation } from 'react-i18next';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useValidation = () => {
  const { t } = useTranslation();

  function validateEmail(value?: string | undefined) {
    if (!value) {
      return `${t('validate_email_error1')}`;
    }

    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

    if (!emailPattern.test(value)) {
      return `${t('validate_email_error2')}`;
    }
  }

  function validatePassword(value?: string | undefined) {
    if (!value) {
      return `${t('validate_password_error1')}`;
    }

    if (value.length < 8) {
      return `${t('validate_password_error2')}`;
    }

    const hasNumber = /\d/;
    if (!hasNumber.test(value)) {
      return `${t('validate_password_error3')}`;
    }
  }

  function validateName(value?: string | undefined) {
    if (!value) {
      return `${t('validate_name_error1')}`;
    }

    if (value.length < 2) {
      return `${t('validate_name_error2')}`;
    }
  }

  function validatePhoneNumber(value?: string | undefined) {
    if (!value) {
      return;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(value)) {
      return `${t('validate_phone_error1')}`;
    }
  }

  function validateMessage(value?: string | undefined) {
    if (!value) {
      return `${t('validate_message_error1')}`;
    }

    if (value.length < 10) {
      return `${t('validate_message_error2')}`;
    }
  }

  function validateSongData(value?: string | undefined) {
    if (!value) {
      return `${t('validate_song_data')}`;
    }
  }

  return {
    validateEmail,
    validatePassword,
    validateName,
    validatePhoneNumber,
    validateMessage,
    validateSongData,
  };
};
