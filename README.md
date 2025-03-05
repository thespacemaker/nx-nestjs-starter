# NX NestJS Starter Project

This project is a starter template for building robust and scalable applications using
NestJS, NX, and a CQRS architecture.

## Getting Started

1.  **Prerequisites:** Make sure you have Docker and `pnpm` installed on your system.

2.  **Start the Docker Environment:**

```bash
	docker-compose up -d
```

This command will start the necessary services defined in the `docker-compose.yml` file
(e.g., databases, message brokers).

3.  **Configure Environment Variables:**

    - Create a `.env` file in the root directory of the project. Populate it with the
      necessary environment variables, using the example `.example.env` file in the root
      as a template.
    - Create a `.env` file in the `apps/api` directory. Populate it with the API-specific
      environment variables, using the `.example.env` file in the `apps/api` directory as
      a template.

      **Important:** Refer to the `.example.env` files for the specific environment
      variables required for each environment.

4.  **Start the Application:**

        ```bash
        pnpm start
        ```

        This command will start the NestJS API application.

5.  **Access API Documentation:**

        Once the application is running, you can access the automatically generated Swagger API documentation at:

        ```
        http://localhost:3000/api/docs
        ```

## Running Tests

To execute the unit tests, use the following command:

```bash
	pnpm test
```

## Architecture: CQRS with a Facade

This project employs a CQRS (Command Query Responsibility Segregation) architecture to
promote separation of concerns, improve scalability, and enhance maintainability.

- Commands: Represent write operations (e.g., creating, updating, deleting data).
- Queries: Represent read operations (e.g., retrieving data).

To simplify the interaction with commands and queries, a CQRS Facade is implemented. This
facade provides a single point of entry for dispatching commands and queries throughout
the application.

## Benefits of CQRS and the Facade:

- Clean Separation of Concerns: Read and write operations are clearly separated, leading
  to more modular and testable code.

- Flexibility: Allows for independent optimization of read and write models and data
  stores.

- Scalability: Facilitates scaling read and write operations independently, as needed.

- Reusability: The CQRS facade can be used in various contexts, including:

  - Controllers (REST API)

  - GraphQL Resolvers

  - Message Queue Consumers (e.g., for asynchronous processing)

## Microservices-Ready

The CQRS architecture makes this project well-suited for both monolithic and microservices
deployments.

- Monolith: The application can run as a single unit, with all components co-located.

- Microservices: The application can be easily decomposed into microservices, with
  commands and queries potentially handled by separate services. For example:

  - A dedicated "Write Service" handling all commands (create, update, delete).

  - One or more "Read Services" optimized for handling specific queries.

This separation of concerns allows for independent scaling and deployment of different
parts of the application, significantly improving scalability and resilience.

## P.S. Unused Modules

**Post Scriptum**: Please note that this starter project may contain modules (such as the
HealthModule and i18n related components) that are currently unused in the core
functionality demonstrated. These modules are included as potential building blocks for
future extensions and can be safely removed if they are not needed in your specific
implementation.
