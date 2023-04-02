import { NextComponentType, NextPage } from 'next';

export type Guard = <T>(
  Component: NextComponentType | NextPage<T>
) => (props: T | any) => JSX.Element;
