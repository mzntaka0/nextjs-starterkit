import React from 'react'
import {NextPage} from 'next'

export type ExtendedNextPage<P> = NextPage<P> & (NextPage<P> & {getLayout?(page: React.ReactNode): any})
