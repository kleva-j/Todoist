import React, { lazy, Suspense } from 'react'
import { Skeleton } from 'antd'

const ProjectSkeleton = () => (<Skeleton loading active title />)

const LazyProjectContainer = lazy(() => import('./ProjectContainer'))

const ProjectSuspense = () => (
  <Suspense fallback={<ProjectSkeleton />}>
    <LazyProjectContainer />
  </Suspense>
)

export default ProjectSuspense;
