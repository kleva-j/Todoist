import React, { lazy, Suspense } from 'react'
import { Skeleton } from 'antd'

const ProjectListSkeleton = () => (<Skeleton loading active title />)

const LazyProjectContainer = lazy(() => import('./index'))

const ProjectListSuspense = () => (
  <Suspense fallback={<ProjectListSkeleton />}>
    <LazyProjectContainer />
  </Suspense>
)

export default ProjectListSuspense;
