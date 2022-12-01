/* eslint-disable prettier/prettier */
import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from 'react-query';

import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
    const title =
        error instanceof Error ? error.message : 'error connecting to server';

    toast.closeAll();
    toast({ title, status: 'error', variant: 'subtle', isClosable: true });
}
// error hadling 처리 
// to satisfy typescript until this file has uncommented contents
// useErrorBoundary 옵션을 이용하면 react-query 내에서 에러를 처리 할수있다,.
export const queryclient = new QueryClient({
    defaultOptions: {
        queries: {
            onError: queryErrorHandler,
        }
    }
});
