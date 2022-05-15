/* eslint-disable @typescript-eslint/ban-types */

import { AggregateRoot } from 'commons/domain';

type ExampleProps = {};

class Example extends AggregateRoot<ExampleProps> {
  private constructor(props: ExampleProps, id?: string) {
    super(props, id);
  }

  static build(props: ExampleProps, id?: string): Example {
    const instance = new this(props, id);

    return instance;
  }
}

export { Example };
