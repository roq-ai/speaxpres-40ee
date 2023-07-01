import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getUserDataById, updateUserDataById } from 'apiSdk/user-data';
import { Error } from 'components/error';
import { userDataValidationSchema } from 'validationSchema/user-data';
import { UserDataInterface } from 'interfaces/user-data';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function UserDataEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<UserDataInterface>(
    () => (id ? `/user-data/${id}` : null),
    () => getUserDataById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: UserDataInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateUserDataById(id, values);
      mutate(updated);
      resetForm();
      router.push('/user-data');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<UserDataInterface>({
    initialValues: data,
    validationSchema: userDataValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit User Data
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="speech_accuracy" mb="4" isInvalid={!!formik.errors?.speech_accuracy}>
              <FormLabel>Speech Accuracy</FormLabel>
              <Input
                type="text"
                name="speech_accuracy"
                value={formik.values?.speech_accuracy}
                onChange={formik.handleChange}
              />
              {formik.errors.speech_accuracy && <FormErrorMessage>{formik.errors?.speech_accuracy}</FormErrorMessage>}
            </FormControl>
            <FormControl id="fluency" mb="4" isInvalid={!!formik.errors?.fluency}>
              <FormLabel>Fluency</FormLabel>
              <Input type="text" name="fluency" value={formik.values?.fluency} onChange={formik.handleChange} />
              {formik.errors.fluency && <FormErrorMessage>{formik.errors?.fluency}</FormErrorMessage>}
            </FormControl>
            <FormControl id="articulation" mb="4" isInvalid={!!formik.errors?.articulation}>
              <FormLabel>Articulation</FormLabel>
              <Input
                type="text"
                name="articulation"
                value={formik.values?.articulation}
                onChange={formik.handleChange}
              />
              {formik.errors.articulation && <FormErrorMessage>{formik.errors?.articulation}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'user_data',
    operation: AccessOperationEnum.UPDATE,
  }),
)(UserDataEditPage);
