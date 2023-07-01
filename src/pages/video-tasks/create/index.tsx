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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createVideoTask } from 'apiSdk/video-tasks';
import { Error } from 'components/error';
import { videoTaskValidationSchema } from 'validationSchema/video-tasks';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { VideoTaskInterface } from 'interfaces/video-task';

function VideoTaskCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: VideoTaskInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createVideoTask(values);
      resetForm();
      router.push('/video-tasks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<VideoTaskInterface>({
    initialValues: {
      difficulty_level: '',
      speech_goal: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: videoTaskValidationSchema,
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
            Create Video Task
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="difficulty_level" mb="4" isInvalid={!!formik.errors?.difficulty_level}>
            <FormLabel>Difficulty Level</FormLabel>
            <Input
              type="text"
              name="difficulty_level"
              value={formik.values?.difficulty_level}
              onChange={formik.handleChange}
            />
            {formik.errors.difficulty_level && <FormErrorMessage>{formik.errors?.difficulty_level}</FormErrorMessage>}
          </FormControl>
          <FormControl id="speech_goal" mb="4" isInvalid={!!formik.errors?.speech_goal}>
            <FormLabel>Speech Goal</FormLabel>
            <Input type="text" name="speech_goal" value={formik.values?.speech_goal} onChange={formik.handleChange} />
            {formik.errors.speech_goal && <FormErrorMessage>{formik.errors?.speech_goal}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
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
    entity: 'video_task',
    operation: AccessOperationEnum.CREATE,
  }),
)(VideoTaskCreatePage);
