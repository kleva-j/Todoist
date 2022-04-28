INSERT INTO public.accounts (
  id,
  compound_id,
  user_id,
  provider_type,
  provider_id,
  provider_account_id,
  refresh_token,
  access_token,
  access_token_expires,
  created_at,
  updated_at
) VALUES (
  '4a250393-1aa8-4fbc-a349-672609d7ce79',
  '758a69951dd3f2a6b93662db4c55b22f2333216c5c2079ddf95f557185696af8',
  '72ad01dc-9c5e-4844-a60d-6b653c75a363',
  'oauth',
  'google',
  '110127495875220400815',
  NULL,
  'ya29.a0AfH6SMCyjCqi1qMu1dqQu0DWDJ-DUketNL7oRrJklZdl67lgUPSLj3sqb7Wil72G9IBCY5L3iSipakAOtPyvDu1Vbu9eCSYmmjitLoKtbBIpdl2Ypfg4_8NDmGgWfl-sJJbyNn7RKMEn4x1wF8U5YpMiA5fn3ZVVrd9f',
  NULL,
  '2020-07-30 15:38:05.270128+00',
  '2020-07-30 15:38:05.270128+00'
);

INSERT INTO public.feeds (
  id,
  author_id,
  body,
  created_at,
  updated_at
) VALUES (
  'bfa5a42d-1fe9-4fd7-a47c-6bc6e074fc51',
  '72ad01dc-9c5e-4844-a60d-6b653c75a363',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pulvinar urna odio, eget fringilla ipsum volutpat ut. Mauris vel nunc ligula. Curabitur neque odio, varius sit amet fringilla eget, maximus sed ante.',
  '2020-07-30 19:00:44.107312+00',
  '2020-07-30 19:00:44.107312+00'
);

INSERT INTO public.feeds (
  id,
  author_id,
  body,
  created_at,
  updated_at
) VALUES (
  '07b160d8-8cf3-48be-8bef-aa73f6e459c4',
  '72ad01dc-9c5e-4844-a60d-6b653c75a363',
  'Morbi mollis tristique tempus. Cras finibus tristique velit, dignissim porttitor enim euismod eu. Duis tincidunt lacinia interdum. Sed eu elit mollis, condimentum nisl iaculis, convallis tortor.',
  '2020-07-30 19:38:50.639452+00',
  '2020-07-30 19:38:50.639452+00'
);

INSERT INTO public.feeds (
  id,
  author_id,
  body,
  created_at,
  updated_at
) VALUES (
  '15364138-6591-413f-b6db-7dd34e354c45',
  '72ad01dc-9c5e-4844-a60d-6b653c75a363',
  'Nam condimentum posuere eleifend. Proin rhoncus mi in mi congue, et varius velit semper. Integer suscipit sed augue a interdum. Nunc dictum vulputate facilisis. ',
  '2020-07-30 19:47:30.427743+00',
  '2020-07-30 19:47:30.427743+00'
);

INSERT INTO public.feeds (
  id,
  author_id,
  body,
  created_at,
  updated_at
) VALUES (
  '8ae90763-9746-4a0c-b952-71c9bda6cab8',
  '72ad01dc-9c5e-4844-a60d-6b653c75a363',
  'Nulla tempor in leo ut ultrices. Integer eget est at massa ultrices lobortis in ac nisi. Sed lacinia odio ut felis mattis bibendum.',
  '2020-07-30 19:50:28.129349+00',
  '2020-07-30 19:50:28.129349+00'
);

INSERT INTO public.feeds (
  id,
  author_id,
  body,
  created_at,
  updated_at
) VALUES (
  '6e2b67cb-d8cf-4d9b-842b-2e731dd040cd',
  '72ad01dc-9c5e-4844-a60d-6b653c75a363',
  'Nunc bibendum viverra nisi, vel sollicitudin urna malesuada sed. Nunc vehicula augue et massa sodales, ac euismod ante varius. Mauris at pretium orci. Pellentesque rutrum a enim et mollis. In metus risus, elementum in felis consectetur, eleifend ultricies leo. Maecenas interdum convallis mauris, eget lobortis ex accumsan et. Aliquam tristique sem id velit pellentesque suscipit.',
  '2020-07-30 19:52:21.535422+00',
  '2020-07-30 19:52:21.535422+00'
);

INSERT INTO public.feeds (
  id,
  author_id,
  body,
  created_at,
  updated_at
) VALUES (
  'e3df2e9a-17c5-4c35-ad65-609b480f3d04',
  '72ad01dc-9c5e-4844-a60d-6b653c75a363',
  'Curabitur vel vestibulum magna. Curabitur et arcu quis ligula lacinia mattis at facilisis orci. Vivamus ac elit nunc. Mauris magna turpis, laoreet quis pharetra eget, vulputate non nisi. Nullam condimentum volutpat sapien vel mattis. Donec nibh ex, tempor id felis quis, varius euismod augue.', '2020-07-30 19:52:32.01556+00', '2020-07-30 19:52:32.01556+00'
);

INSERT INTO public.feeds (
  id,
  author_id,
  body,
  created_at,
  updated_at
) VALUES (
  '91da0b4a-9a82-4d75-b03b-2f306606fa00',
  '72ad01dc-9c5e-4844-a60d-6b653c75a363',
  'Duis facilisis orci sed nisi luctus, vitae pretium neque malesuada. Nullam posuere pharetra lacinia. Maecenas vel leo nisl.',
  '2020-07-30 19:53:11.154018+00',
  '2020-07-30 19:53:11.154018+00'
);

INSERT INTO public.users (
  id,
  name,
  email,
  email_verified,
  image,
  created_at,
  updated_at
) VALUES (
  '72ad01dc-9c5e-4844-a60d-6b653c75a363',
  'John Doe',
  'john@doe.com',
  NULL,
  '',
  '2020-07-30 15:38:05.240549+00',
  '2020-07-30 19:40:53.634539+00'
);